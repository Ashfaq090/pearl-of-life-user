import { Component, OnInit, NgZone } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { getYearlyPrice } from 'src/app/services/plan-display.util';
import { FeaturesService } from '../features.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscriptionplan.component.html',
  styleUrls: ['./subscriptionplans.component.scss'],
})
export class SubscriptionPlansComponent implements OnInit {
  plans: any[] = [];
  loading: boolean = false;
  private paypalScriptLoaded = false;
  public isHighestPlan = false;
  public currentSubscription: any = null;
  private readonly NEW_FEATURE_BULLETS: string[] = [];
  private readonly REMOVED_FEATURE_BULLETS = [
    'more detailed life information such as achievements, diplomas, friends, employment, etc.',
    'Schools (Dates & Degrees)',
    'Employment (Titles & Dates)',
    'Career Achievements (Titles & Dates)',
    'Church Affiliation /Titles held/ year joined',
    'Other Achievements',
    'Club Memberships',
    'Other Group Affiliations etc',
    'Greatest Friendships',
    'Special Instructions',
  ];

  selectedPlanId: string | null = null;
  promoOrder: {
    orderId: string; planId: string; originalAmount: number;
    amount: number; discountPercent: number; currency: string; status: string;
  } | null = null;
  applyingPromo = false;
  checkoutBusy = false;
  paymentMessage = '';
  private promoRequestVersion = 0;
  private promoAttempted = false;

  selectPlan(plan: any, renderButtons = true): void {
    if (this.checkoutBusy || this.selectedPlanId === plan.id) return;
    this.selectedPlanId = plan.id;
    this.promoRequestVersion++;
    this.applyingPromo = false;
    this.promoOrder = null;
    this.promoAttempted = false;
    this.paymentMessage = '';
    if (renderButtons) this.renderPayPalButtonsSafely();
  }

  promoCodeOne: FormControl = new FormControl('');
  promoCodeTwo: FormControl = new FormControl('');

  constructor(
    private paymentService: PaymentService,
    private ngZone: NgZone,
    private featuresService: FeaturesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPlans();
    this.loadUserPlan();
    this.loadCurrentSubscription();
  }

  trackByPlanId(_: number, plan: any): string {
    return String(plan?.id ?? _);
  }

  loadPlans() {
    this.loading = true;
    this.paymentService.getSubscriptionPlans().subscribe({
      next: (plans) => {
        this.plans = plans
          .filter(
            (plan: any) => plan?.name !== 'Ultimate Legacy Creation Plan'
          )
          .map((plan: any) => {
            const featuresList = this.paymentService.normalizePlanFeatures(
              plan.features
            );
            const displayPrice = this.getDisplayYearly(plan);

            return {
              ...plan,
              featuresList: this.mergeAndDedupeFeatures(featuresList),
              displayPrice,
              displayPeriodLabel: '/year',
              displayDurationLabel: '12 months',
              membership: this.getMembershipLabel(plan),
              auto: 'Automatic Renewal.',
            };
          });
        this.plans = this.sortPlansByPrice(this.plans);
        this.loading = false;

        // Initialize PayPal buttons after plans are loaded
        this.loadPayPalScript().then(() => {
          this.renderPayPalButtonsSafely();
        }).catch(() => {
          this.paymentMessage = 'PayPal could not be loaded. Please reload the page and try again.';
        });
      },
      error: (error) => {
        console.error('Error loading plans:', error);
        this.loading = false;
        // Fallback to default plans if API fails
        this.plans = this.sortPlansByPrice(this.getDefaultPlans());
        this.loadPayPalScript().then(() => {
          this.renderPayPalButtonsSafely();
        }).catch(() => {
          this.paymentMessage = 'PayPal could not be loaded. Please reload the page and try again.';
        });
      },
    });
  }

  getDefaultPlans() {
    return [
      {
        id: 'basic',
        name: 'Advanced Auto-Obituary Plan',
        price: 3,
        membership: this.getMembershipLabel({ price: 3, name: 'Advanced Auto-Obituary Plan' }),
        displayPrice: 36,
        displayPeriodLabel: '/year',
        displayDurationLabel: '12 months',
        auto: 'Automatic Renewal.',
        description:
          'Includes auto-obituary section plus additional life details.',
        featuresList: this.mergeAndDedupeFeatures([
          '1 picture to be used as funeral program cover photo',
          'Grandchildren Names & age • Siblings (Dates & Degrees)',
          'Work Achievements',
          'Education Achievements',
          'When & where you met your spouse',
          'Other',
        ]),
      },
      {
        id: 'standard',
        name: 'Legacy Creation Plan',
        price: 7,
        membership: this.getMembershipLabel({ price: 7, name: 'Legacy Creation Plan' }),
        displayPrice: 84,
        displayPeriodLabel: '/year',
        displayDurationLabel: '12 months',
        auto: 'Automatic Renewal.',
        description:
          'Leave the comfort of the sound of your voice. Make a video of you talking/singing etc. (Look in the section for talking topics.) Auto-obituary plan plus video memories, pictures, audio notes and short stories. Highlight your achievements over the years.',
        featuresList: this.mergeAndDedupeFeatures([
          'Record up to ten 3-minute videos a year',
          'Upload up to 30 pictures w/ audio recorded descriptions.',
        ]),
      },
      // {
      //   id: 'premium',
      //   name: 'Ultimate Legacy Creation Plan',
      //   price: 11,
      //   membership: 'One Year Membership $132',
      //   displayPrice: 132,
      //   displayPeriodLabel: '/month',
      //   displayDurationLabel: '1 month',
      //   auto: 'Automatic Renewal.',
      //   description:
      //     'Includes legacy creation plan plus additional videos, pictures and audio notes.',
      //   featuresList: this.mergeAndDedupeFeatures([
      //     // 'Records an additional three minute video',
      //     // 'Show as seen at the end',
      //     'Includes additional 60 pictures & 20 audio notes.',
      //   ]),
      // },
    ];
  }

  private mergeAndDedupeFeatures(existing: any[]): string[] {
    const merged: string[] = [];
    const seen = new Set<string>();
    const add = (item: any) => {
      const value = String(item).trim();
      if (
        this.REMOVED_FEATURE_BULLETS.some(
          (removed) => removed.toLowerCase() === value.toLowerCase()
        )
      ) {
        return;
      }
      if (!value || seen.has(value)) return;
      seen.add(value);
      merged.push(value);
    };

    (existing || []).forEach(add);
    this.NEW_FEATURE_BULLETS.forEach(add);
    return merged;
  }

  private loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.paypalScriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${'ARNps61AVXJjxC1ArcGk1cA0kMyocB7SoilcRsnP2bfJB2EWXenlcUIe4PxNiTdWd5s6W0mq8SL2HC61'}&currency=USD`;

      script.onload = () => {
        this.paypalScriptLoaded = true;
        resolve();
      };

      script.onerror = (error) => {
        console.error('PayPal SDK could not be loaded:', error);
        reject(error);
      };

      document.body.appendChild(script);
    });
  }

  private renderPayPalButtonsSafely(): void {
    if (!(window as any)?.paypal?.Buttons) return;

    setTimeout(() => {
      this.plans.forEach((plan) => {
        const container = document.getElementById(`paypal-button-${plan.id}`);
        if (!container) return;
        container.innerHTML = '';
        if (this.checkoutBusy) return;
        // Only the plan with a pending/failed promo attempt needs to wait.
        if (this.selectedPlanId === plan.id &&
            (this.applyingPromo || (this.promoAttempted && !this.promoOrder))) return;
        const promo = this.promoOrder?.planId === plan.id ? this.promoOrder : null;
        const isCurrent = () =>
          (this.promoOrder?.planId === plan.id ? this.promoOrder : null) === promo;
        (window as any).paypal.Buttons({
          style: { label: 'pay' },
          createOrder: () => this.ngZone.run(async () => {
            if (!isCurrent() || this.applyingPromo || this.checkoutBusy) {
              throw new Error('Please select the plan and apply your promo again.');
            }
            // Clicking a normal checkout also selects its plan, clearing another
            // plan's promo without replacing the PayPal button opening checkout.
            this.selectPlan(plan, false);
            this.checkoutBusy = true;
            this.paymentMessage = '';
            try {
              // Promo orders already exist: never create a second, full-price order.
              if (promo) return promo.orderId;
              const response = await firstValueFrom(this.paymentService.createOrder(
                this.getEffectiveYearlyForPlan(plan), plan.id
              ));
              if (!response?.orderId) throw new Error('No payment order was returned.');
              return response.orderId;
            } catch (error) {
              this.checkoutBusy = false;
              throw error;
            }
          }),
          onApprove: (data: any) => this.ngZone.run(async () => {
            if (!isCurrent() || (promo && data.orderID !== promo.orderId)) {
              this.checkoutBusy = false;
              this.paymentMessage = 'The payment order does not match the selected plan. Please apply your promo again.';
              return;
            }
            this.checkoutBusy = true;
            try {
              const details = await firstValueFrom(this.paymentService.capturePayment(
                promo ? promo.orderId : data.orderID, promo ? promo.planId : plan.id
              ));
              if ((details?.status ?? details?.data?.status) !== 'COMPLETED') {
                this.paymentMessage = 'Payment has not completed. Please retry checkout.';
                return;
              }
              this.paymentMessage = 'Payment completed successfully!';
              this.promoOrder = null;
              this.selectedPlanId = null;
              this.promoRequestVersion++;
              this.loadCurrentSubscription();
              this.loadUserPlan();
            } catch (error: any) {
              this.paymentMessage = error?.error?.message || 'Payment failed. Please retry checkout.';
            } finally {
              this.checkoutBusy = false;
            }
          }),
          onCancel: () => this.ngZone.run(() => {
            this.checkoutBusy = false;
            this.paymentMessage = 'Checkout cancelled. You can retry your payment.';
          }),
          onError: (error: any) => this.ngZone.run(() => {
            console.error('PayPal checkout failed:', error);
            this.checkoutBusy = false;
            this.paymentMessage = 'Payment failed. Please retry checkout.';
          }),
        }).render(container).catch((error: any) => this.ngZone.run(() => {
          console.error('PayPal button could not be rendered:', error);
          this.paymentMessage = 'PayPal could not be loaded. Please reload the page and try again.';
        }));
      });
    }, 0);
  }

  private loadUserPlan(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    this.featuresService.getUserPlan().subscribe({
      next: (res: any) => {
        this.isHighestPlan =
          String(res?.plan?.name || '').toLowerCase() ===
          'legacy creation plan';
      },
      error: () => {
        this.isHighestPlan = false;
      },
    });
  }

  private loadCurrentSubscription(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    this.paymentService.getCurrentSubscription().subscribe({
      next: (res: any) => {
        const normalized =
          res?.data ?? res?.subscription ?? res?.currentSubscription ?? res;
        if (normalized?.plan) {
          this.currentSubscription = normalized;
        } else if (normalized?.name || normalized?.price) {
          this.currentSubscription = { plan: normalized };
        } else {
          this.currentSubscription = null;
        }
        this.resetPaypalContainers();
        this.renderPayPalButtonsSafely();
      },
      error: () => {
        this.currentSubscription = null;
      },
    });
  }

  private getMonthlyPrice(plan: any): number {
    const raw = plan?.price ?? plan?.monthlyPrice ?? plan?.amount ?? 0;
    const num =
      typeof raw === 'string'
        ? Number(raw.replace(/[^0-9.]/g, ''))
        : Number(raw);
    return Number.isFinite(num) ? num : 0;
  }

  private getCurrentYearlyPrice(): number {
    if (!this.currentSubscription?.plan) return 0;
    return getYearlyPrice(this.currentSubscription.plan);
  }

  private getEffectiveYearlyCharge(plan: any): number {
    const yearly = getYearlyPrice(plan);
    const currentYearly = this.getCurrentYearlyPrice();

    if (yearly === 84 && currentYearly === 36) {
      return 48;
    }
    return yearly;
  }

  // Effective yearly amount for BOTH display + PayPal charge
  // - Normal: plan.price * 12 (84 for $7)
  // - Upgrade: if user has active $36 plan AND this plan is $84 => charge 48
  getEffectiveYearlyForPlan(plan: any): number {
    return Number(this.getDisplayYearly(plan));
  }

  private hasBasic36Active(): boolean {
    const plan = this.currentSubscription?.plan || null;
    if (!plan) return false;
    const yearly = getYearlyPrice(plan);
    return yearly === 36;
  }

  private isPremium84Plan(plan: any): boolean {
    const yearly = getYearlyPrice(plan);
    return yearly === 84;
  }

  getYearlyFromMonthly(plan: any): number {
    return this.getMonthlyPrice(plan) * 12;
  }

  getDisplayYearly(plan: any): number {
    const yearly = getYearlyPrice(plan);
    if (this.isPremium84Plan(plan) && this.hasBasic36Active()) {
      return 48;
    }
    return yearly;
  }

  getDisplayMonthly(plan: any): number {
    if (this.isPremium84Plan(plan) && this.hasBasic36Active()) {
      return 4;
    }
    return this.getMonthlyPrice(plan);
  }

  getMembershipLabel(plan: any): string {
    const monthly = this.getDisplayMonthly(plan);
    return `Monthly price $${monthly}`;
  }

  private sortPlansByPrice(plans: any[]): any[] {
    const list = Array.isArray(plans) ? [...plans] : [];
    list.sort((a, b) => this.getMonthlyPrice(a) - this.getMonthlyPrice(b));
    return list;
  }

  private resetPaypalContainers(): void {
    (this.plans || []).forEach((plan: any) => {
      const id = `paypal-button-${plan.id}`;
      const el = document.getElementById(id);
      if (!el) return;
      (el as any).__paypalRendered = false;
      el.innerHTML = '';
    });
  }

  goToPricing(): void {
    this.router.navigate(['/pricing']);
  }

  subscribeViaPromo(plan: any, index: number): void {
    if (this.checkoutBusy || this.applyingPromo) return;
    this.selectPlan(plan);
    const promoCode = String(index === 0 ? this.promoCodeOne.value : this.promoCodeTwo.value).trim();
    if (!promoCode) {
      this.paymentMessage = 'Please enter a promo code.';
      return;
    }
    const version = ++this.promoRequestVersion;
    this.promoOrder = null;
    this.promoAttempted = true;
    this.applyingPromo = true;
    this.paymentMessage = '';
    this.renderPayPalButtonsSafely();
    this.paymentService.subscribeViaPromo(promoCode, plan.id).subscribe({
      next: (response: any) => {
        if (version !== this.promoRequestVersion || this.selectedPlanId !== plan.id) return;
        this.applyingPromo = false;
        const pricing = response?.data;
        const orderId = response?.orderId || pricing?.orderId;
        if (response?.success !== true || !orderId || pricing?.planId !== plan.id ||
            pricing?.status !== 'pending' || pricing?.currency !== 'USD' ||
            typeof pricing?.amount !== 'number' || !Number.isFinite(pricing.amount) || pricing.amount < 0 ||
            typeof pricing?.originalAmount !== 'number' || !Number.isFinite(pricing.originalAmount) ||
            typeof pricing?.discountPercent !== 'number' || !Number.isFinite(pricing.discountPercent)) {
          this.paymentMessage = response?.message || 'No valid promo order was returned. Please apply the promo again.';
          // Keep checkout unavailable after an unsuccessful promo attempt.
          return;
        }
        this.promoOrder = { ...pricing, orderId };
        this.renderPayPalButtonsSafely();
      },
      error: (error) => {
        if (version !== this.promoRequestVersion) return;
        this.applyingPromo = false;
        this.paymentMessage = error?.error?.message || 'Failed to apply promo code. Please try again.';
      },
    });
  }

}

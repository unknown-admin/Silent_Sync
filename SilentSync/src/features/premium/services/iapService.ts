import Purchases, {
  PurchasesOffering,
  CustomerInfo,
} from 'react-native-purchases';
import {Platform} from 'react-native';
import {REVENUECAT_API_KEY, ENTITLEMENT_ID} from '@config/iap';

export const iapService = {
  configure(): void {
    if (Platform.OS === 'android' && REVENUECAT_API_KEY) {
      Purchases.configure({apiKey: REVENUECAT_API_KEY});
    }
  },

  async getOfferings(): Promise<PurchasesOffering | null> {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  },

  async purchase(packageId: string): Promise<boolean> {
    const offering = await this.getOfferings();
    const pkg = offering?.availablePackages.find(
      p => p.identifier === packageId || p.product.identifier === packageId,
    );
    if (!pkg) {
      throw new Error('Plan not available');
    }
    const {customerInfo} = await Purchases.purchasePackage(pkg);
    return this.isEntitled(customerInfo);
  },

  async restore(): Promise<boolean> {
    const customerInfo = await Purchases.restorePurchases();
    return this.isEntitled(customerInfo);
  },

  async checkStatus(): Promise<boolean> {
    const customerInfo = await Purchases.getCustomerInfo();
    return this.isEntitled(customerInfo);
  },

  isEntitled(info: CustomerInfo): boolean {
    return info.entitlements.active[ENTITLEMENT_ID] !== undefined;
  },
};

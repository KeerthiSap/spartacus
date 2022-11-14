import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CaptchaApiConfig {
  apiUrl?: string;
  fields?: { [key: string]: string };
}

declare module '@spartacus/core' {
  interface Config extends CaptchaApiConfig {}
}

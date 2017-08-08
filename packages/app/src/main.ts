import 'core-js/client/shim.min';
import 'zone.js/dist/zone';
import 'web-animations-js';

import './assets/main';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootModule } from './root.module';

platformBrowserDynamic().bootstrapModule(RootModule);

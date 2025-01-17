import { customElement, property } from '@polymer/decorators';
import '@polymer/google-map';
import '@polymer/paper-icon-button';
import { PolymerElement, html } from '@polymer/polymer';
import { RootState } from '../store';
import { ReduxMixin } from '../store/mixin';
import { initialUiState } from '../store/ui/state';
import { CONFIG, getConfig } from '../utils/config';
import { location, mapBlock } from '../utils/data';
import '../utils/icons';
import './shared-styles';

@customElement('map-block')
export class MapBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          margin: 32px auto;
          display: block;
          position: relative;
        }

        .description-card {
          margin: 0 -16px;
          padding: 16px;
          background-color: var(--default-primary-color);
          color: var(--text-primary-color);
        }

        .bottom-info {
          margin-top: 24px;
        }

        .directions {
          --paper-icon-button: {
            width: 48px;
            height: 48px;
            color: var(--text-primary-color);
          }
        }

        @media (min-width: 640px) {
          :host {
            margin: 64px auto 72px;
          }

          google-map {
            display: block;
            height: 640px;
          }

          .description-card {
            margin: 0;
            padding: 24px;
            max-width: 320px;
            transform: translateY(80px);
            border-radius: var(--border-radius);
          }

          .address {
            font-size: 12px;
          }
        }
      </style>


      <template is="dom-if" if="[[viewport.isTabletPlus]]">
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.9471462807765!2d72.5391087!3d23.135607099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8305eb738af9%3A0x78b2026d688c9da1!2sShree%20Shakti%20Convention%20Centre!5e0!3m2!1sen!2sin!4v1728030100703!5m2!1sen!2sin" width="100% !important" height="650" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> ⁠
        </div>
      </template>

      <div class="container" layout vertical end-justified fit$="[[viewport.isTabletPlus]]">
        <div class="description-card" layout vertical justified>
          <div>
            <h2>[[mapBlock.title]]</h2>
            <p>[[location.description]]</p>
          </div>
          <div class="bottom-info" layout horizontal justified center>
            <span class="address">[[location.address]]</span>
            <a
              href="https://www.google.com/maps/dir/?api=1&amp;destination=[[location.address]]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <paper-icon-button
                class="directions"
                icon="hoverboard:directions"
              ></paper-icon-button>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  private location = location;
  private mapBlock = mapBlock;
  private googleMapApiKey = getConfig(CONFIG.GOOGLE_MAPS_API_KEY);

  @property({ type: Object })
  private viewport = initialUiState.viewport;
  @property({ type: Object })
  private option = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    scrollwheel: false,
    draggable: false,
    styles: [
      {
        stylers: [{ lightness: 40 }, { visibility: 'on' }, { gamma: 0.9 }, { weight: 0.4 }],
      },
      {
        elementType: 'labels',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'water',
        stylers: [{ color: '#5dc7ff' }],
      },
      {
        featureType: 'road',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  override stateChanged(state: RootState) {
    this.viewport = state.ui.viewport;
  }
}

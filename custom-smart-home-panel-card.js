import {
    LitElement,
    html,
    css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";
class CustomSmartHomePanelCard extends LitElement {
  
  static get properties() {
    return {
      hass: {},
      config: {},
      active: {}
    };
  }
  
  constructor() {
    super();
  }
  
  render() {
    var brightnessWidth = this.config.brightnessWidth ? this.config.brightnessWidth : "100px";
    var brightnessHeight = this.config.brightnessHeight ? this.config.brightnessHeight : "300px";
    var switchWidth = this.config.switchWidth ? this.config.switchWidth : "100px";
    var switchHeight = this.config.switchHeight ? this.config.switchHeight : "300px";
    
    var count = 0;
    var countText = this.config.countText ? this.config.countText : "lights on";
    var entityCounter = 0;
    
    console.log(this.config);
    
    return html`
        <div class="page">
          <div class="side">
            <div class="header">
              Header
            </div>
            <div class="center">
              <div class="icon">
                <ha-icon icon="${this.config.icon}" />
              </div>
              <h1>${this.config.title}</h1>
              <h3>${count} ${countText}</h3>
            </div>
            <div class="bottom">
              <button class="back-btn">Home</button>
            </div>
          </div>
          
          <div class="main">
            
            ${this.config.entities.map(ent => {
                entityCounter++;
                var switchValue = 0;
                const stateObj = this.hass.states[ent.entity];
                switch(stateObj.state) {
                    case 'on':
                        switchValue = 1;
                        break;
                    case 'off':
                        switchValue = 0;
                        break;
                    default:
                        switchValue = 0;
                }
                return stateObj ? html`
                    <div class="light">
                      <div class="light-slider">
                        <h2>${ent.name || stateObj.attributes.friendly_name}</h2>
                        ${stateObj.attributes.supported_features > 9 ? html`
                            <h4 class="brightness">${stateObj.state === "off" ? 0 : Math.round(stateObj.attributes.brightness/2.55)}</h4>
                            <div class="range-holder" style="--slider-height: ${brightnessHeight};">
                              <input type="range" style="--slider-width: ${brightnessWidth};--slider-height: ${brightnessHeight};" .value="${stateObj.state === "off" ? 0 : Math.round(stateObj.attributes.brightness/2.55)}" @change=${e => this._setBrightness(stateObj, e.target.value)}>
                            </div>
                        ` : html`
                            <h4>${stateObj.state}</h4>
                            <div class="switch-holder" style="--switch-height: ${switchHeight}">
                              <input type="range" style="--switch-width: ${switchWidth};--switch-height: ${switchHeight};" value="0" min="0" max="1" .value="${switchValue}" @change=${e => this._switch(stateObj)}>
                            </div>
                        `}
                      </div>
                      <div class="toggle">
                        <input ?checked=${stateObj.state == "on"} type="checkbox" id='toggle${entityCounter}' class='toggle-btn' />
                        <label for='toggle${entityCounter}'><span></span></label>
                      </div>  
                    </div>
                `: html``;
            })}
          </div>
        </div>
    `;
  }
    
  updated() {}
  
  _setBrightness(state, value) {
    this.hass.callService("homeassistant", "turn_on", {
        entity_id: state.entity_id,
        brightness: value * 2.55
    });
  }
  
  _switch(state) {
      this.hass.callService("homeassistant", "toggle", {
        entity_id: state.entity_id    
      });
  }
  
  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    if (!config.title) {
      throw new Error("You need to define a title");
    }
    if (!config.icon) {
      throw new Error("You need to define a icon");
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
        :host {
            
        }
        .page {
          width:100%;
          height:100%;
          display:flex;
          flex-direction: row;
        }
        .page > .side {
          width:30%;
          padding:15px;
          display:flex;
          flex-direction:column;
          background: rgb(28,122,226);
          background: linear-gradient(235deg, rgba(28,122,226,1) 0%, rgba(66,230,222,1) 90%);
          justify-content:space-between
        }
        .side .header {
          
        }
        .side .center {
          display:flex;
          flex-direction:column;
          
        }
        .side .center .icon {
          display:block;
          overflow:hidden;
        }
        .side .center .icon svg {
          
        }
        .side .center  h1 {
          color:#FFF;
          margin:0;
          font-weight:400;
          font-size:34px;
        }
        .side .center  h3 {
          color:#FFF;
          margin:5px 0 0 0;
          font-weight:300;
          font-size:16px;
        }
        
        .side .bottom {
        }
        
        .back-btn {
          border:2px solid #FFF;
          color:#FFF;
          background:transparent;
          font-size:24px;
          border-radius:4px;
          width:100%;
          display:block;
        }
        
        .page > .main {
          width:70%;
          display:flex;
          flex-direction:row;
          align-items: center;
          justify-content: center;
        }
        
        .page > .main > .light {
          width:150px;
          display:inline-block;
          
        }
        
        .light .icon {
          margin: 0 auto;
          text-align:center;
          display:block;
          height: 40px;
          width: 40px;
          color: rgba(255,255,255,0.3);
          font-size: 30px;
          padding-top:5px;
        }
        .light .icon ha-icon {
          width:30px;
          height:30px;
        }
        .light .icon.on ha-icon {
          fill: #f7d959;
        }
        h2 {
          color: #FFF;
          display: block;
          font-weight: 300;
          margin-bottom: 10px;
          text-align: center;
          font-size:20px;
          margin-top:0;
        }
        h4 {
          color: #FFF;
          display: block;
          font-weight: 300;
          margin-bottom: 30px;
          text-align: center;
          font-size:16px;
          margin-top:0;
        }
        h4.brightness:after {
          content: "%";
          padding-left: 1px;
        }
        
        .range-holder {
          height: var(--slider-height);
          position:relative;
          display: block;
        }
        .range-holder input[type="range"] {
          outline: 0;
          border: 0;
          border-radius: 4px;
          width: var(--slider-height);
          margin: 0;
          transition: box-shadow 0.2s ease-in-out;
          -webkit-transform:rotate(270deg);
          -moz-transform:rotate(270deg);
          -o-transform:rotate(270deg);
          -ms-transform:rotate(270deg);
          transform:rotate(270deg);
          overflow: hidden;
          height: var(--slider-width);
          -webkit-appearance: none;
          background-color: #ddd;
          position: absolute;
          top: calc(50% - (var(--slider-width) / 2));
          right: calc(50% - (var(--slider-height) / 2));
        }
        .range-holder input[type="range"]::-webkit-slider-runnable-track {
          height: var(--slider-width);
          -webkit-appearance: none;
          color: #ddd;
          margin-top: -1px;
          transition: box-shadow 0.2s ease-in-out;
        }
        .range-holder input[type="range"]::-webkit-slider-thumb {
          width: 25px;
          border-right:10px solid #FFF;
          border-left:10px solid #FFF;
          border-top:20px solid #FFF;
          border-bottom:20px solid #FFF;
          -webkit-appearance: none;
          height: 80px;
          cursor: ew-resize;
          background: #fff;
          box-shadow: -350px 0 0 350px #FFF, inset 0 0 0 80px #ddd;
          border-radius: 0;
          transition: box-shadow 0.2s ease-in-out;
          position: relative;
          top: calc((var(--slider-width) - 80px) / 2);
        }
        .switch-holder {
          height: var(--switch-height);
          position:relative;
          display: block;
        }
        .switch-holder input[type="range"] {
          outline: 0;
          border: 0;
          border-radius: 4px;
          width: calc(var(--switch-height) - 20px);
          margin: 0;
          transition: box-shadow 0.2s ease-in-out;
          -webkit-transform: rotate(270deg);
          -moz-transform: rotate(270deg);
          -o-transform: rotate(270deg);
          -ms-transform: rotate(270deg);
          transform: rotate(270deg);
          overflow: hidden;
          height: calc(var(--switch-width) - 20px);
          -webkit-appearance: none;
          background-color: #ddd;
          padding: 10px;
          position: absolute;
          top: calc(50% - (var(--switch-width) / 2));
          right: calc(50% - (var(--switch-height) / 2));
        }
        .switch-holder input[type="range"]::-webkit-slider-runnable-track {
          height: calc(var(--switch-width) - 20px);
          -webkit-appearance: none;
          color: #ddd;
          margin-top: -1px;
          transition: box-shadow 0.2s ease-in-out;
        }
        .switch-holder input[type="range"]::-webkit-slider-thumb {
          width: calc(var(--switch-height) / 2);
          -webkit-appearance: none;
          height: calc(var(--switch-width) - 20px);
          cursor: ew-resize;
          background: #fff;
          transition: box-shadow 0.2s ease-in-out;
          box-shadow: -340px 0 0 350px #ddd, inset 0 0 0 80px #FFF;
          position: relative;
          top: 0;
          border-radius: 4px;
        }
        
        .scene-holder {
          display: flex;
          flex-direction: column;
          margin-top:20px;
        }
        .scene-row {
          display:block;
          text-align:center;
          padding-bottom:10px;
        }
        .scene-row:last-child {
          padding:0;
        }
        .scene-holder .scene {
          display:inline-block;
          margin-right:10px;
          cursor:pointer;
        }
        .scene-holder .scene:nth-child(4n) {
          margin-right:0;
        }
        .scene-holder .scene .color {
          width:50px;
          height:50px;
          border-radius:50%;
          display:block;
        }
        .scene-holder .scene .name {
          width:50px;
          overflow:hidden;
          display:block;
          color: #FFF;
          font-size: 9px;
          margin-top:3px;
        }
        
        .toggle {
          margin-top:30px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .toggle > input.toggle-btn {
          display: none;
        }
        .toggle > input.toggle-btn + label {
          border: 1px solid #FFF;
          background: transparent;
          width:100px;
          height:100px;
          text-align:center;
          line-height:100px;
          cursor: pointer;
          border-radius: 4px;
          color:#FFF;
          display:block;
          font-size:22px;
        }
        .toggle > input.toggle-btn:not(:checked) + label > span:before {
          content: 'Off';
        }
        .toggle > input.toggle-btn + label:active,
        .toggle > input.toggle-btn:checked + label {
          background: #1c7ae2;
          border-color: #1c7ae2;
        }
        .toggle > input.toggle-btn:checked + label > span:before {
          content: 'On';
        }
    `;
  }  
  
}

customElements.define('custom-smart-home-panel-card', CustomSmartHomePanelCard);

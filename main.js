(()=>{"use strict";const e=class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=t}_showInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._form.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}resetValidation(){this._toggleButtonState(),this._inputElements.forEach((e=>{this._hideInputError(e)}))}_toggleButtonState(){return this._hasInvalidInput(this._inputElements)?this.disableButton():this.enableButton()}_hasInvalidInput(e){return!e.every((e=>e.validity.valid))}disableButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}enableButton(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1}_checkInputValidity(e){if(!e.validity.valid)return this._showInputError(e);this._hideInputError(e)}_setEventListeners(){this._inputElements=[...this._form.querySelectorAll(this._inputSelector)],this._submitButton=this._form.querySelector(this._submitButtonSelector),this.disableButton(),this._inputElements.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}},t=document.querySelector(".profile__edit-button"),s=document.querySelector("#add-button"),n={inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};class r{constructor(e){let{popupSelector:t}=e;this._popup=document.querySelector(t),this._handleEscapeClose=this._handleEscapeClose.bind(this)}open(){this._popup.classList.add("popup_open"),document.addEventListener("keyup",this._handleEscapeClose)}close(){this._popup.classList.remove("popup_open"),document.removeEventListener("keyup",this._handleEscapeClose)}_handleEscapeClose(e){e.preventDefault(),"Escape"===e.key&&this.close()}setEventListeners(){this._popup.addEventListener("mousedown",(e=>{e.target.closest(".popup__content")&&!e.target.classList.contains("popup__close-button")||this.close()}))}}class i extends r{constructor(e){let{popupSelector:t,handleFormSubmit:s,resetOnClose:n}=e;super({popupSelector:t}),this._resetOnClose=n,this._popupForm=this._popup.querySelector(".popup__form"),this._inputList=this._popupForm.querySelectorAll(".popup__input"),this._handleFormSubmit=s}_getInputValues(){const e={};return this._inputList.forEach((t=>e[t.name]=t.value)),e}open(){this._resetOnClose&&this._popupForm.reset(),super.open()}setEventListeners(){this._popupForm.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues()),this.close(),this._popupForm.reset()})),super.setEventListeners()}}const o=new class{constructor(e,t){let{items:s,renderer:n}=e;this._initialArray=s,this._renderer=n,this._container=document.querySelector(t)}renderItems(){this._initialArray.reverse().forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({items:[{name:"Yosemite Valley",link:"https://code.s3.yandex.net/web-code/yosemite.jpg"},{name:"Lake Louise",link:"https://code.s3.yandex.net/web-code/lake-louise.jpg"},{name:"Bald Mountains",link:"https://code.s3.yandex.net/web-code/bald-mountains.jpg"},{name:"Latemar",link:"https://code.s3.yandex.net/web-code/latemar.jpg"},{name:"Vanoise National Park",link:"https://code.s3.yandex.net/web-code/vanoise.jpg"},{name:"Lago di Braies",link:"https://code.s3.yandex.net/web-code/lago.jpg"}],renderer:e=>{o.addItem(l(e))}},".cards__array");function l(e){return new class{constructor(e,t,s){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handleCardClick=s}_setEventListeners(){this._element.querySelector(".cards__like-button").addEventListener("click",(()=>this._handleLikeButton())),this._element.querySelector(".cards__delete").addEventListener("click",(()=>this._handleDeleteCard())),this._element.querySelector(".card__image").addEventListener("click",(()=>this._handleCardClick({link:this._link,name:this._name})))}_handleLikeButton(){this._element.querySelector(".cards__like-button").classList.toggle("cards__like-button_active")}_handleDeleteCard(){this._element.remove(),this._element=null}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}getView(){this._element=this._getTemplate();const e=this._element.querySelector(".card__image"),t=this._element.querySelector(".cards__location-title");return e.src=this._link,e.alt=this._name,t.textContent=this._name,this._setEventListeners(),this._element}}(e,"#card-template",(e=>{c.open(e)})).getView()}o.renderItems(),new e(n,document.querySelector("#edit-profile-form")).enableValidation();const a=new e(n,document.querySelector("#add-card-form"));a.enableValidation();const u=new i({popupSelector:"#edit-popup",handleFormSubmit:e=>{_.setUserInfo(e)}});u.setEventListeners();const p=new i({popupSelector:"#add-popup",handleFormSubmit:e=>{o.addItem(l(e))},resetOnClose:!0});p.setEventListeners();const c=new class extends r{open(e){let{name:t,link:s}=e;this._popup.querySelector(".popup__preview-text").textContent=t,this._popup.querySelector(".popup__preview-text").alt=t,this._popup.querySelector(".popup__preview-image").src=s,super.open()}}({popupSelector:"#preview-popup"});c.setEventListeners();const _=new class{constructor(e){let{userNameSelector:t,userTitleSelector:s}=e;this._userName=document.querySelector(t),this._userTitle=document.querySelector(s)}getUserInfo(){return{userName:this._userName.textContent,userTitle:this._userTitle.textContent}}setUserInfo(e){let{name:t,title:s}=e;this._userName.textContent=t,this._userTitle.textContent=s}}({userNameSelector:".profile__name",userTitleSelector:".profile__title"});t.addEventListener("click",(()=>{const{userName:e,userTitle:t}=_.getUserInfo();document.querySelector(".popup__input_type_name").value=e,document.querySelector(".popup__input_type_title").value=t,a.resetValidation(),u.open()})),s.addEventListener("click",(()=>{a.resetValidation(),p.open()}))})();
//# sourceMappingURL=main.js.map
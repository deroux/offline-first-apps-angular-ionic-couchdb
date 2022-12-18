'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">julies documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApplicationpipesModule.html" data-type="entity-link" >ApplicationpipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-ApplicationpipesModule-4e0711b3c3e7b97a4c6b7ddefecd704ad3fc22ae79eb2b59a32fba1be6397da2bb0ebbe7fc1240fcc70bad4c190ed36b7fcbe0fe0b5d0d3c09e3af3ca38fa6ac"' : 'data-target="#xs-pipes-links-module-ApplicationpipesModule-4e0711b3c3e7b97a4c6b7ddefecd704ad3fc22ae79eb2b59a32fba1be6397da2bb0ebbe7fc1240fcc70bad4c190ed36b7fcbe0fe0b5d0d3c09e3af3ca38fa6ac"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ApplicationpipesModule-4e0711b3c3e7b97a4c6b7ddefecd704ad3fc22ae79eb2b59a32fba1be6397da2bb0ebbe7fc1240fcc70bad4c190ed36b7fcbe0fe0b5d0d3c09e3af3ca38fa6ac"' :
                                            'id="xs-pipes-links-module-ApplicationpipesModule-4e0711b3c3e7b97a4c6b7ddefecd704ad3fc22ae79eb2b59a32fba1be6397da2bb0ebbe7fc1240fcc70bad4c190ed36b7fcbe0fe0b5d0d3c09e3af3ca38fa6ac"' }>
                                            <li class="link">
                                                <a href="pipes/OrderbyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderbyPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-f78646d713b3606aedde1fb52ccd52cb58f3304393d1571f9a385887ea3e2f8eb8f1d410e8b3f2de2c7358b59dec24aa1b9b146f4f3243292647f552d168ea8a"' : 'data-target="#xs-components-links-module-AppModule-f78646d713b3606aedde1fb52ccd52cb58f3304393d1571f9a385887ea3e2f8eb8f1d410e8b3f2de2c7358b59dec24aa1b9b146f4f3243292647f552d168ea8a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-f78646d713b3606aedde1fb52ccd52cb58f3304393d1571f9a385887ea3e2f8eb8f1d410e8b3f2de2c7358b59dec24aa1b9b146f4f3243292647f552d168ea8a"' :
                                            'id="xs-components-links-module-AppModule-f78646d713b3606aedde1fb52ccd52cb58f3304393d1571f9a385887ea3e2f8eb8f1d410e8b3f2de2c7358b59dec24aa1b9b146f4f3243292647f552d168ea8a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CrudProductsPageModule.html" data-type="entity-link" >CrudProductsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CrudProductsPageModule-ba611319163e562ff2d8c0e450e7be899f782a9f0fb668a73d51e5cbf67c8f81fb2ed97e248572d69e33febc955a48ff6b2cff1e8333faa8a81ced7fcb605f72"' : 'data-target="#xs-components-links-module-CrudProductsPageModule-ba611319163e562ff2d8c0e450e7be899f782a9f0fb668a73d51e5cbf67c8f81fb2ed97e248572d69e33febc955a48ff6b2cff1e8333faa8a81ced7fcb605f72"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CrudProductsPageModule-ba611319163e562ff2d8c0e450e7be899f782a9f0fb668a73d51e5cbf67c8f81fb2ed97e248572d69e33febc955a48ff6b2cff1e8333faa8a81ced7fcb605f72"' :
                                            'id="xs-components-links-module-CrudProductsPageModule-ba611319163e562ff2d8c0e450e7be899f782a9f0fb668a73d51e5cbf67c8f81fb2ed97e248572d69e33febc955a48ff6b2cff1e8333faa8a81ced7fcb605f72"' }>
                                            <li class="link">
                                                <a href="components/CrudProductsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrudProductsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CrudProductsPageRoutingModule.html" data-type="entity-link" >CrudProductsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CrudTablesPageModule.html" data-type="entity-link" >CrudTablesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CrudTablesPageModule-fa08b59b353d7e259a9de10f8c62de93a23b6ab24bf7bef0fef79149655649a9d094a2565b9c0ac68e9780ee87fdfe96045b8acbfca15a49dc0c17c3fd930c64"' : 'data-target="#xs-components-links-module-CrudTablesPageModule-fa08b59b353d7e259a9de10f8c62de93a23b6ab24bf7bef0fef79149655649a9d094a2565b9c0ac68e9780ee87fdfe96045b8acbfca15a49dc0c17c3fd930c64"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CrudTablesPageModule-fa08b59b353d7e259a9de10f8c62de93a23b6ab24bf7bef0fef79149655649a9d094a2565b9c0ac68e9780ee87fdfe96045b8acbfca15a49dc0c17c3fd930c64"' :
                                            'id="xs-components-links-module-CrudTablesPageModule-fa08b59b353d7e259a9de10f8c62de93a23b6ab24bf7bef0fef79149655649a9d094a2565b9c0ac68e9780ee87fdfe96045b8acbfca15a49dc0c17c3fd930c64"' }>
                                            <li class="link">
                                                <a href="components/CrudTablesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrudTablesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CrudTablesPageRoutingModule.html" data-type="entity-link" >CrudTablesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExploreContainerComponentModule.html" data-type="entity-link" >ExploreContainerComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' : 'data-target="#xs-components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' :
                                            'id="xs-components-links-module-ExploreContainerComponentModule-2814c4c990070c76fa78ba30eb29067f01f11055a26ff0a819dfccd8566453302558e5e37efb07d56f24a3f685fde5915c7efd385bfd89cdd358e69fa94faede"' }>
                                            <li class="link">
                                                <a href="components/ExploreContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExploreContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KitchenPageModule.html" data-type="entity-link" >KitchenPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-KitchenPageModule-b0e1fc3390b33eb0d30b33308463a2d7f726e64f55876692435f27cc7cd14b05a2f07ef4c5f255c296de2747b3aa3f3ae3249f5cbfad882bf0784a2c91276960"' : 'data-target="#xs-components-links-module-KitchenPageModule-b0e1fc3390b33eb0d30b33308463a2d7f726e64f55876692435f27cc7cd14b05a2f07ef4c5f255c296de2747b3aa3f3ae3249f5cbfad882bf0784a2c91276960"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KitchenPageModule-b0e1fc3390b33eb0d30b33308463a2d7f726e64f55876692435f27cc7cd14b05a2f07ef4c5f255c296de2747b3aa3f3ae3249f5cbfad882bf0784a2c91276960"' :
                                            'id="xs-components-links-module-KitchenPageModule-b0e1fc3390b33eb0d30b33308463a2d7f726e64f55876692435f27cc7cd14b05a2f07ef4c5f255c296de2747b3aa3f3ae3249f5cbfad882bf0784a2c91276960"' }>
                                            <li class="link">
                                                <a href="components/KitchenPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KitchenPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KitchenPageRoutingModule.html" data-type="entity-link" >KitchenPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PayPageModule.html" data-type="entity-link" >PayPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PayPageModule-5bff3e9d8c65859ce238344312e17557b8a48fb55958609e92f76f18459092c62c3fd1d0279cf682040b41b7333d9e131ac053d134c2620798269b70b6f4c14b"' : 'data-target="#xs-components-links-module-PayPageModule-5bff3e9d8c65859ce238344312e17557b8a48fb55958609e92f76f18459092c62c3fd1d0279cf682040b41b7333d9e131ac053d134c2620798269b70b6f4c14b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PayPageModule-5bff3e9d8c65859ce238344312e17557b8a48fb55958609e92f76f18459092c62c3fd1d0279cf682040b41b7333d9e131ac053d134c2620798269b70b6f4c14b"' :
                                            'id="xs-components-links-module-PayPageModule-5bff3e9d8c65859ce238344312e17557b8a48fb55958609e92f76f18459092c62c3fd1d0279cf682040b41b7333d9e131ac053d134c2620798269b70b6f4c14b"' }>
                                            <li class="link">
                                                <a href="components/PayPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PayPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PayPageRoutingModule.html" data-type="entity-link" >PayPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TableDetailsPageModule.html" data-type="entity-link" >TableDetailsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TableDetailsPageModule-5ceef07df22bb967ab60d95b4322d193a1c44f7838352a2c337e2e7c11b41cd579c1a7c1f5aeb67dfbc218d2769b78aab89c0a1fa1f81aad3208e55cb5b1877b"' : 'data-target="#xs-components-links-module-TableDetailsPageModule-5ceef07df22bb967ab60d95b4322d193a1c44f7838352a2c337e2e7c11b41cd579c1a7c1f5aeb67dfbc218d2769b78aab89c0a1fa1f81aad3208e55cb5b1877b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableDetailsPageModule-5ceef07df22bb967ab60d95b4322d193a1c44f7838352a2c337e2e7c11b41cd579c1a7c1f5aeb67dfbc218d2769b78aab89c0a1fa1f81aad3208e55cb5b1877b"' :
                                            'id="xs-components-links-module-TableDetailsPageModule-5ceef07df22bb967ab60d95b4322d193a1c44f7838352a2c337e2e7c11b41cd579c1a7c1f5aeb67dfbc218d2769b78aab89c0a1fa1f81aad3208e55cb5b1877b"' }>
                                            <li class="link">
                                                <a href="components/TableDetailsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableDetailsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableDetailsPageRoutingModule.html" data-type="entity-link" >TableDetailsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TablesPageModule.html" data-type="entity-link" >TablesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TablesPageModule-0a7994e47852cd28d4f7078af8c3d9acea6b9a8c94caa23f19aa6931dcbb1d2ae87a4c8c2e0673c2be477964efe644842e70990452c1a984e0ffe1e84df43c5c"' : 'data-target="#xs-components-links-module-TablesPageModule-0a7994e47852cd28d4f7078af8c3d9acea6b9a8c94caa23f19aa6931dcbb1d2ae87a4c8c2e0673c2be477964efe644842e70990452c1a984e0ffe1e84df43c5c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TablesPageModule-0a7994e47852cd28d4f7078af8c3d9acea6b9a8c94caa23f19aa6931dcbb1d2ae87a4c8c2e0673c2be477964efe644842e70990452c1a984e0ffe1e84df43c5c"' :
                                            'id="xs-components-links-module-TablesPageModule-0a7994e47852cd28d4f7078af8c3d9acea6b9a8c94caa23f19aa6931dcbb1d2ae87a4c8c2e0673c2be477964efe644842e70990452c1a984e0ffe1e84df43c5c"' }>
                                            <li class="link">
                                                <a href="components/TablesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TablesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TablesPageRoutingModule.html" data-type="entity-link" >TablesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link" >TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' : 'data-target="#xs-components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' :
                                            'id="xs-components-links-module-TabsPageModule-9a82605f2e76bb229ee6cae8f1a3128303e07ff362318f0d51c5f7a750ded065a7196a39b737aedc5b06c775053525b64ee9d0713eb3f28ff651ad3ed0f26ce4"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link" >TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BillDoc.html" data-type="entity-link" >BillDoc</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConsumedProduct.html" data-type="entity-link" >ConsumedProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/DBRepository.html" data-type="entity-link" >DBRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/PouchDBRepository.html" data-type="entity-link" >PouchDBRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductsConsumedDoc.html" data-type="entity-link" >ProductsConsumedDoc</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductsDoc.html" data-type="entity-link" >ProductsDoc</a>
                            </li>
                            <li class="link">
                                <a href="classes/Table.html" data-type="entity-link" >Table</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableDoc.html" data-type="entity-link" >TableDoc</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BillService.html" data-type="entity-link" >BillService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsConsumedService.html" data-type="entity-link" >ProductsConsumedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableService.html" data-type="entity-link" >TableService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IDBRepository.html" data-type="entity-link" >IDBRepository</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
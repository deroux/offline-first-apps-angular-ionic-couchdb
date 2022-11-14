import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1Page } from './tab1.page';

// jasmin based jargon
describe('Tab1Page', () => { // creates test suite
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  
  beforeEach(waitForAsync(() => { // setup, runs before each spec (it) test case
    // Angular based jargon
    // TestBed: ~ Angular module with dependencies for testing of component
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();
    // fixture: wrapper that can access HTML and TS components, use to create components and services for an instance
    fixture = TestBed.createComponent(Tab1Page);
    // pages in angular are components
    component = fixture.componentInstance;
    // start angular change detection Lifecycle
    fixture.detectChanges();
  }));

  it('should create', () => { // test Case, 1 spec, one test in the suite
    expect(component).toBeTruthy();
  });
});


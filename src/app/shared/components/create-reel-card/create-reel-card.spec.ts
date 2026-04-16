import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReelCard } from './create-reel-card';

describe('CreateReelCard', () => {
  let component: CreateReelCard;
  let fixture: ComponentFixture<CreateReelCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReelCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReelCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

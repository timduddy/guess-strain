import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../../environments/environment';
import { CardService } from './card.service';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
      ],
      providers: [UploadService, CardService]
    });
  });

  it('should be created', inject([UploadService], (service: UploadService) => {
    expect(service).toBeTruthy();
  }));
});

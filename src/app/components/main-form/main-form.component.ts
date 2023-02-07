import {Component, HostListener, OnInit} from '@angular/core';
import {MarsStorageService} from "../../services/mars-storage.service";
import {IMarsPhoto} from "../../models/mars-photo/mars-photo.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  providers: [MarsStorageService]

})
export class MainFormComponent implements OnInit {
  page$ = new Subject<number>()

  roverCameras = [
    {
      code: "FHAZ", value: "Front Hazard Avoidance Camera"
    },
    {
      code: "RHAZ", value: "Rear Hazard Avoidance Camera"
    },
    {
      code: "MAST", value: "Mast Camera"
    },
    {
      code: "CHEMCAM", value: "Chemistry and Camera Complex"
    },
    {
      code: "MAHLI", value: "Mars Hand Lens Imager"
    },
    {
      code: "MARDI", value: "Mars Descent Imager"
    },
    {
      code: "NAVCAM", value: "Navigation Camera"
    },
    {
      code: "PANCAM", value: "Panoramic Camera"
    },
    {
      code: "MINITES", value: "Miniature Thermal Emission Spectrometer (Mini-TES)"
    },
  ]

  sol = ''
  camera = ''
  photos: IMarsPhoto[] = []
  loading = false
  isAttemptGetData = false
  page = 1
  isSubmitBtnDisabled = true;

  constructor(private marsStorageService: MarsStorageService) {
  }

  onSubmit() {
    this.isSubmitBtnDisabled = false;
    this.loading = true
    this.photos = []
    this.marsStorageService.getMarsPhotos(this.page, this.sol, this.camera).subscribe((value) => {
      this.isAttemptGetData = true
      this.photos = value.photos
      this.loading = false
      this.isSubmitBtnDisabled = true
    })
  }

  isEmptyData() {
    return this.isAttemptGetData && this.photos.length === 0 && !this.loading
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: Event) {

    const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom === document.documentElement.clientHeight) {
      this.page$.next(++this.page)
    }
  }

  ngOnInit() {
    this.page$.subscribe({
      next: (nextPage) => {
        this.marsStorageService.getMarsPhotos(this.page, this.sol, this.camera).subscribe((value) => {
          this.isAttemptGetData = true
          this.photos = [...this.photos, ...value.photos]
          this.loading = false
        })
      }
    })
  }
}

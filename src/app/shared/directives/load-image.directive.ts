import { Directive, Input, ElementRef, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  selector: '[appLoadImage]'
})
export class LoadImageDirective implements OnChanges {


  @Input() source;
  imageObserver: any;

  constructor(private elRef: ElementRef) { }

  ngOnChanges(): void {
    if (this.source) {
      this.observeAndLazyLoadImages(this.elRef.nativeElement);
    }
  }

  observeAndLazyLoadImages = (lazyImage: Element): void => {
    const intersectionObs = 'IntersectionObserver' in window;
    if (intersectionObs) {

      if (this.imageObserver) {
        this.imageObserver.unobserve(lazyImage);
        this.imageObserver = null;
      }

      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setImageSrcFromDataset(entry.target);
            this.imageObserver.unobserve(entry.target);
            this.imageObserver = null;
          }
        });
      });
      this.imageObserver.observe(lazyImage);
    } else {
      this.setImageSrcFromDataset(lazyImage);
    }
  }

  setImageSrcFromDataset = (imageTag): void => {
    imageTag.src = this.source;
    imageTag.parentNode.classList.remove('image-loading');
  }

}

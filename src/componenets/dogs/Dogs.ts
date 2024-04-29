import type { InitValues } from '@/providers/dogs/dogs';
import type { Subscriber } from '@/providers/store/subscriberList';

class Dogs implements Subscriber {
  private SECTION_ID: string;

  constructor() {
    this.SECTION_ID = 'dogs-gallery';
    const root = document.getElementById('root'); // Get root element.
    if (root) {
      const dogsSection = document.createElement('div');
      dogsSection.classList.add('dogs-gallery');
      dogsSection.setAttribute('id', this.SECTION_ID);
      dogsSection.innerHTML = '<div class="spinner"></div>';
      root.appendChild(dogsSection);
    }
  }

  public notify: (data: unknown) => void = (data) => {
    const section = document.getElementById(this.SECTION_ID);
    if (section) {
      const { dogs, error, loading } = (data as { dogs: InitValues }).dogs;
      const dogsImages = dogs
        .map((dog) => `<img src='${dog}' alt='${dog} dog'>`)
        .join('');

      if (loading) {
        section.innerHTML = '<div class="spinner"></div>';
      } else if (error) {
        section.innerHTML = `<p>${error}</p>`;
      } else {
        section.innerHTML = dogsImages;
      }
    }
  };
}

export default Dogs;

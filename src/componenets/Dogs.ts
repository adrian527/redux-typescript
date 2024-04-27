import type { InitValues } from '@/providers/dogs/dogs';
import type { Subscriber } from '@/providers/store/subscriberList';

class Dogs implements Subscriber {
  constructor() {
    const root = document.getElementById('root'); // Get root element.
    if (root) {
      root.innerHTML = '<p>Loading</p>';
    }
  }

  public notify: (data: unknown) => void = (data) => {
    const root = document.getElementById('root'); // Get root element.
    if (root) {
      const { dogs, error, loading } = (data as { dogs: InitValues }).dogs;
      const dogsImages = dogs
        .map((dog) => `<img src='${dog}' alt='${dog} dog'>`)
        .join('');

      if (loading) {
        root.innerHTML = '<p>Loading</p>';
      } else if (error) {
        root.innerHTML = `<p>${error}</p>`;
      } else {
        root.innerHTML = `<div class="dogs-gallery">${dogsImages}</div>`;
      }
    }
  };
}

export default Dogs;

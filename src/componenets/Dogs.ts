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

      if (loading) {
        root.innerHTML = '<p>Loading</p>';
      } else if (error) {
        root.innerHTML = `<p>${error}</p>`;
      } else {
        root.innerHTML = `<p><img src='${dogs[0]}' alt='dog image'></p>`;
      }
    }
  };
}

export default Dogs;

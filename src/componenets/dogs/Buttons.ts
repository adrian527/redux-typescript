import type { Store } from '@/helpers/store/Store';
import type DogsProvider from '@/providers/dogs/dogs';

class Buttons {
  private SECTION_ID: string;

  constructor(store: Store, provider: DogsProvider) {
    this.SECTION_ID = 'dogs-gallery';
    const root = document.getElementById('root'); // Get root element.
    const dogSection = document.getElementById(this.SECTION_ID); // Get root element.

    if (root && dogSection) {
      const buttons = document.createElement('div');
      buttons.classList.add('dogs-buttons');
      [6, 8, 10].map((value) => {
        const button = document.createElement('button');
        button.textContent = `Add ${value} dogs`;
        button.addEventListener('click', () =>
          this.loadDogs(value, store, provider),
        );
        buttons.appendChild(button);
      });
      root.appendChild(buttons);
    }
  }

  private loadDogs = (
    nr: number,
    store: Store,
    provider: DogsProvider,
  ): void => {
    provider.fetchDogsAction(store, nr);
  };
}

export default Buttons;

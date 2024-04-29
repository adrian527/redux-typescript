import type { InitValues } from '@/providers/dogs/dogs';

class Header {
  private SECTION_ID: string;
  private LABEL_ID: string;

  constructor() {
    this.SECTION_ID = 'dogs-gallery';
    this.LABEL_ID = 'dogs-counter';

    const section = document.getElementById(this.SECTION_ID); // Get root element.
    const root = document.getElementById('root'); // Get root element.

    if (section && root) {
      const header = document.createElement('h2');
      header.innerHTML = `Dogs (<span id="${this.LABEL_ID}">-</span>)`;
      root.insertBefore(header, section);
    }
  }

  public notify: (data: unknown) => void = (data) => {
    const label = document.getElementById(this.LABEL_ID);
    if (label) {
      const { dogs, error, loading } = (data as { dogs: InitValues }).dogs;

      if (!loading && !error) {
        label.textContent = dogs.length.toFixed();
      }
    }
  };
}

export default Header;

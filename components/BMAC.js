import Script from 'next/script';
import Image from 'next/image';

const BMAC = () => {
  return (
    <>
      <a
        href='https://www.buymeacoffee.com/dingran'
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png'
          alt='Buy Me A Coffee'
          width='160px'
        />
      </a>
      <Script
        type='text/javascript'
        src='https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
        data-name='bmc-button'
        data-slug='dingran'
        data-color='#FFDD00'
        data-emoji=''
        data-font='Cookie'
        data-text='Buy me a coffee'
        data-outline-color='#000000'
        data-font-color='#000000'
        data-coffee-color='#ffffff'
      ></Script>
    </>
  );
};

export default BMAC;

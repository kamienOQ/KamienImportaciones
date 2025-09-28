import CommentsCarousel from './CommentsCarousel';
import { imagePaths, numberOfImages } from "./CommentsData";
import ImageBuy from '../../assets/imageNavBar.webp';

export const CommentsCardTop = () => {
  return (
    <>
      <div>
        <h1 className='title-comments-top'>Opiniones de los clientes</h1>
      </div>
      <div className="container-top">
        <CommentsCarousel slides={imagePaths} options={numberOfImages} />
      </div>
      <div className='image-container-top'>
        {/* <img src={ImageBuy} className="image-buy-secure" alt="Imagen compra segura" /> */}
      </div>
    </>
  );
}


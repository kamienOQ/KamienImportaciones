import CommentsCarousel from './CommentsCarousel';
import { imagePaths, numberOfImages } from "./CommentsData";
import ImageBuy from '../../assets/imageNavBar.webp';

export const CommentsCard = () => {
  return (
    <>
      <div>
        <h1 className='title-comments'>Opiniones de los clientes</h1>
      </div>
      <div className="container">
        <CommentsCarousel slides={imagePaths} options={numberOfImages} />
      </div>
      <div className='image-container'>
        <img src={ImageBuy} className="image-buy-secure" alt="Imagen compra segura" />
      </div>
    </>
  );
}


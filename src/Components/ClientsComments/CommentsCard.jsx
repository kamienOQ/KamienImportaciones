import CommentsCarousel from './CommentsCarousel';
import { imagePaths, numberOfImages } from "./CommentsData";

export const CommentsCard = () => {
  return (
    <>
      <div>
        <h1 className='title-comments'>Opiniones de los clientes</h1>
      </div>
      <div className="container animate__animated animate__fadeInLeft animate__slow">
        <CommentsCarousel slides={imagePaths} options={numberOfImages} />
      </div>
      <div>
        <h1 className='title-comments2'>Compra de manera fácil y segura</h1>
      </div>
    </>
  );
}


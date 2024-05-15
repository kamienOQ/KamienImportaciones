import { Skeleton } from '@mui/material';

export const CategoriesEmpty = () => {
  return (
    <div className='container-emptyCategories'>
      <Skeleton variant="rectangular" width={200} height={200} />
      <Skeleton animation="wave" width={100} height={30} style={{ marginTop: 10 }} />
    </div>
  )
}



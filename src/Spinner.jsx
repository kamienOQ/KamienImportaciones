import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='spinner' >
        <CircularProgress />
      </div>
    </div>
  );
};

export default Spinner;

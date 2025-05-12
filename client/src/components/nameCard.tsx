import { Link } from 'react-router-dom';
import { itemProp } from '../utils/dataProps';
import createURL from '../utils/detailsURLLogic';

const NameCard: React.FC<{ data: itemProp[] }> = ({ data }) => {
  return (
    <div
      className="row"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
      }}
    >
      {data.slice(0, 6).map((singleData: itemProp, index) => {
        const urlToDirect = createURL(singleData);
        return (
          <div
            key={index}
            className="four columns playcard"
            style={{
              margin: '0 0.5vw 0.5vw 0',
              padding: '2% 1%',
              backgroundColor: '#2b2b2b',
              height: '12rem',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <img
              alt="cover"
              style={{
                width: '7rem',
                padding: '1.5% 3% 1.5% 1.5%',
                borderRadius: '1.5rem'
              }}
              src={singleData.coverImage}
            />

            <Link to={urlToDirect}>
              <button
                style={{
                  border: 'none',
                  textDecoration: 'none',
                  color: 'white',
                  padding: '3%',
                  fontFamily: "'Montserrat', sans-serif",
                  overflow: 'hidden',
                  textAlign: 'center'
                }}
              >
                {' '}
                {singleData.name}{' '}
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NameCard;

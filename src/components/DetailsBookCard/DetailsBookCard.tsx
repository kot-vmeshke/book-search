import './DetailsBookCard.scss';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { apiSlice } from '../../store/apiSlice';
import defaultCover from '../../assets/no-cover.jpg';
import readIcon from '../../assets/share-03.svg';

const DetailsBookCard: FC = () => {
  const { bookId } = useParams();

  const [searchParams] = useSearchParams();
  const { data, isLoading } = apiSlice.useGetBookDetailsQuery(bookId);

  return (
    <div className="details" data-testid="details">
      <Link
        to={`/?${searchParams.toString()}`}
        className="details__close"
        data-testid="close-btn"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      {!isLoading && data ? (
        <>
          <div className="details__cover">
            <img
              src={data.formats!['image/jpeg'] || defaultCover}
              alt=""
              width={216}
              height={150}
            />
          </div>
          <h3 className="details__name">{data.title}</h3>
          <p className="details__author">
            {data.authors
              .map(
                (author: Person) =>
                  `${author.name}, (${author.birth_year || 'no data'} - ${author.death_year || 'no data'})`
              )
              .join(',')}
          </p>
          <div className="details__wrap">
            <p className="details__type">Subjects:</p>
            <p className="details__text">{data.subjects.join(', ')}</p>
          </div>
          <div className="details__wrap">
            <p className="details__type">Bookshelves:</p>
            <p className="details__text">
              {data.bookshelves?.length ? data.bookshelves.join(', ') : '-'}
            </p>
          </div>
          {data.formats!['text/html'] && (
            <a
              href={data.formats!['text/html']}
              className="details__download"
              target="_blank"
            >
              Read
              <img src={readIcon} alt="" width={12} height={12} />
            </a>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export { DetailsBookCard };

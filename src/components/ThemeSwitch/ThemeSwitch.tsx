import './ThemeSwitch.scss';
import { ChangeEvent, FC, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeSwitch: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
    localStorage.setItem('book-theme', e.target.value);
  };

  return (
    <div className="switch">
      <input
        type="radio"
        name="theme"
        id="dark"
        checked={theme === 'dark'}
        value="dark"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="dark" data-testid="dark-button">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_17_1185)">
            <path
              d="M16.4661 9.71746C15.4335 11.5289 13.4844 12.7502 11.25 12.7502C7.93629 12.7502 5.25 10.064 5.25 6.75025C5.25 4.51572 6.4715 2.56649 8.2832 1.53387C4.47731 1.89473 1.5 5.09971 1.5 9.00007C1.5 13.1422 4.85786 16.5001 9 16.5001C12.9002 16.5001 16.105 13.5231 16.4661 9.71746Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_1185">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </label>
      <input
        type="radio"
        name="theme"
        id="light"
        checked={theme === 'light'}
        value="light"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="light" data-testid="light-button">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_17_1186)">
            <path
              d="M10.0001 1.66666V3.33332M10.0001 16.6667V18.3333M3.33341 9.99999H1.66675M5.26184 5.26175L4.08333 4.08324M14.7383 5.26175L15.9168 4.08324M5.26184 14.7417L4.08333 15.9202M14.7383 14.7417L15.9168 15.9202M18.3334 9.99999H16.6667M14.1667 9.99999C14.1667 12.3012 12.3013 14.1667 10.0001 14.1667C7.6989 14.1667 5.83341 12.3012 5.83341 9.99999C5.83341 7.6988 7.6989 5.83332 10.0001 5.83332C12.3013 5.83332 14.1667 7.6988 14.1667 9.99999Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_1186">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </label>
    </div>
  );
};

export { ThemeSwitch };

import * as React from 'react';
import {ReactSVG} from 'react-svg';

interface Props {
  iconid: number;
}

const IconBox: React.FC<Props> = (props) => {
  const {iconid} = props;
  return (
    <a
      href={`https://flatcon.herokuapp.com/icon/${iconid}`}
      className="box"
      download
    >
      <ReactSVG src={`https://flatcon.herokuapp.com/icon/${iconid}`} />
    </a>
  );
};

export default IconBox;

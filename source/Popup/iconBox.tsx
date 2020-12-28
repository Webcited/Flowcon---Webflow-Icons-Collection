import * as React from 'react';

interface Props {
  link: string;
}

const IconBox: React.FC<Props> = (props) => {
  const { link } = props;
  return (
    <div className="box">
      <img src={link} alt="asdf" />
    </div>
  );
};

export default IconBox;

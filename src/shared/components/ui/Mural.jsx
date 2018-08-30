// Dependencies
import React from 'react';

// Styles
import styles from './Mural.styl';

const Mural = () => {
  const react = <span className={styles.blue}>React.js</span>;
  const redux = <span className={styles.purple}>Redux</span>;
  return (
    <div className={styles.mural}>
      <div className={styles.wrapper}>
        <h1>
          Curso Virtual Intensivo de {react} con {redux}
        </h1>

        <p>
          <strong>Fecha:</strong> Diciembre 2 y 3, 2017 {' '}
          <strong>Duración:</strong> 16hrs {' '}
          <strong>Inversión:</strong> $225USD
        </p>

        <p className={styles.callToAction}><strong>¡Inscríbete aquí!</strong></p>

        <p>
          <img src="http://daynin.github.io/clojurescript-presentation/img/react-logo.png" alt="React" />
        </p>
      </div>
    </div>
  );
};

export default Mural;

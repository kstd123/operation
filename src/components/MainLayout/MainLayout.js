import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';

function MainLayout({ children, location }) {
  return (
    <div className={styles.normal} >
      <Header location={location} contents={children}/>
      <div className={styles.content}>
        <div className={styles.main}>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

import styles from './App.module.scss'
import Sidebar from "./Sidebar";
import {Link} from 'react-router-dom'
// import InvenTable from './Inventory'

function App() {
  return (
    <div className={styles.App}>
      <header className="App-header">
        <Sidebar />
        {/*<InvenTable />*/}
      </header>
    </div>
  );
}

export default App;

import Header from '../components/Header';
import Viewer3D from '../components/Viewer3D';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <>
      <Header />
      <div className="main">
        <Viewer3D />
        <Sidebar />
      </div>
    </>
  );
}

import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

function MainAdmin() {
  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto mt-8 pl-[15rem] pr-4">
        <div className="text">
          <h1 className="text-3xl font-semibold mb-4">Welcome back, Admin!</h1>
          {/* You can add more content here */}
        </div>
      </div>
      <AdminSidebar />
    </>
  );
}

export default MainAdmin;

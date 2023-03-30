import Notes from "./Notes";

export const Home = (props) => {
  let {showAlert}=props;
  return (
    <div>      
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;

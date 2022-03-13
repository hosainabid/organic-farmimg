import axios from "axios";
import React from "react";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";
import TableContainer from "../../../../utilities/TableContainer/TableContainer";

const UploadedSeeds = () => {
  const [isSeedLoaded, setIsSeedLoaded] = React.useState(false);
  const [allSeed, setAllSeed] = React.useState("");
  const loadAllSeed = async () => {
    try {
      const data = await axios
        .get("https://shrouded-basin-02702.herokuapp.com/all_seeds")
        .then((res) => {
          setAllSeed(res.data);
          setIsSeedLoaded(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadAllSeed();
  }, []);

  return (
    <div className="my-4">
      <h3 className="text-center">All Uploaded Seeds</h3>
      {isSeedLoaded ? <TableContainer allSeed={allSeed} /> : <LoadingSpinner />}
    </div>
  );
};

export default UploadedSeeds;

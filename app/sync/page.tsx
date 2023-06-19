import ModalSearch from "../components/search/Modal-Search";
import Box from "./Box";

const content = {};

export default function SyncBKN() {
  return (
    <div className="container pt-4">
      <ModalSearch />
      <Box title="Compare Data With BKN"></Box>
    </div>
  );
}

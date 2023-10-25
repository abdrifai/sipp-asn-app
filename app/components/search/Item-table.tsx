import CariAsnModal from "@/app/hooks/useCariAsnModal";
import useCurrentPNS from "@/app/hooks/useCurrentPNS";

const ItemTable = (data: any) => {
  const showModal = CariAsnModal();
  const currentPNS = useCurrentPNS();

  const saveToLocalStorage = (
    nip: string,
    pegawaiID: string,
    PnsIdBKN: string
  ) => {
    localStorage.setItem("nip", nip);
    localStorage.setItem("id", pegawaiID);
    localStorage.setItem("IdBKN", PnsIdBKN);
  };

  const handleDoubleClick = (id: string, nip: string, pnsIdBKN: string) => {
    currentPNS.NIP = nip;
    currentPNS.pegawaiId = id;
    currentPNS.pnsIdBKN = pnsIdBKN;
    saveToLocalStorage(nip, id, pnsIdBKN);
    showModal.onClose();
  };

  return (
    <>
      {data &&
        data?.data?.data?.map((item: any) => (
          <tr
            key={item.id}
            className="hover:bg-slate-50 hover:cursor-pointer py-2"
            onDoubleClick={() => {
              handleDoubleClick(item.id, item.nipBaru, item.pns_id_sapk);
            }}
          >
            <td className="pl-2 w-2/5 text-center">{item.nipBaru}</td>
            <td>{item.orang.nama}</td>
          </tr>
        ))}
    </>
  );
};

export default ItemTable;

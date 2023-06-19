
import { Tab, Tabs } from "@/app/components/Tabs";
import MenuDataUtama from "./MenuDataUtama";
import MenuRiwayat from "./MenuRiwayat";
import MenuDataLainnya from "./MenuDataLainnya";

export const MenuAsn = () => {
  return (
    <div>
      <Tabs>
        <Tab label="Data Utama">
          <div className="py-4">
            {/* DataUtama */}
            <MenuDataUtama />
          </div>
        </Tab>
        <Tab label="Riwayat">
          <div className="py-4">
            {/* Riwayat */}
            <MenuRiwayat />
          </div>
        </Tab>
        <Tab label="Lainnya">
          <div className="py-4">
            <h2 className="text-lg font-medium mb-2">Lainnya</h2>
            <p className="text-gray-700">
              {/* Data Lainnya */}
              <MenuDataLainnya />
            </p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MenuAsn;

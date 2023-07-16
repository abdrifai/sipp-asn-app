"use client";
import MenuBoxIcons from "@/app/components/menu/MenuBoxIcons";
import React from "react";
import {
  BiBarChart,
  BiBarChartSquare,
  BiBarChartAlt2,
  BiAbacus,
  BiAccessibility,
} from "react-icons/bi";

const StatistikPage = () => {
  return (
    <div className="container pt-6">
      <h3 className="py-2 font-bold text-xl">Laporan Statistik PNS</h3>
      <div className="grid grid-cols-4 gap-3">
        <MenuBoxIcons
          icon={BiBarChart}
          label={"PNS Golongan & Jenis Kelamin"}
          onClick={() => {}}
        />
        <MenuBoxIcons
          icon={BiBarChartSquare}
          label={"PNS Unit Kerja & Jenis Kelamin"}
          onClick={() => {}}
        />
        <MenuBoxIcons
          icon={BiBarChartAlt2}
          label={"PNS Eselon & Jenis Kelamin"}
          onClick={() => {}}
        />
        <MenuBoxIcons
          icon={BiAbacus}
          label={"PNS Pendidikan & Jenis Kelamin"}
          onClick={() => {}}
        />
        <MenuBoxIcons
          icon={BiAccessibility}
          label={"PNS Umur & Jenis Kelamin"}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default StatistikPage;

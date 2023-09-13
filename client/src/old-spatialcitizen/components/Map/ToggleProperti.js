import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

const ToggleProperti = ( props ) => {

    const toogleHandler = () => {
      if (props.activeToggle === 'Geografis') {
        return onGeografis
      } else if (props.activeToggle === 'Kependudukan') {
         return onKependudukan
      } else if (props.activeToggle === 'Pendidikan') {
        return onPendidikan
      } else {
        return onKesehatan
      }
    }

    const handleChangeLayer = (property) => {
        props.onChangeLayer(property);
    }

    // OPSI LAYER
    const onGeografis = 
    <ButtonGroup aria-label='Geografis'>
      <Button variant={props.activeLayer === 'LUAS WILAYAH (KM2)'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("LUAS WILAYAH (KM2)")}> Luas Wilayah </Button>
      <Button variant={props.activeLayer === 'LUAS WILAYAH (KM2)'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("LUAS WILAYAH (KM2)")}> Ketinggian Tanah </Button>
    </ButtonGroup>

    const onKependudukan = 
    <ButtonGroup aria-label='Kependudukan'>
      <Button variant={props.activeLayer === 'JUMLAH PENDUDUK'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("JUMLAH PENDUDUK")}> JUMLAH PENDUDUK </Button>
      <Button variant={props.activeLayer === 'JUMLAH KK'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("JUMLAH KK")}> KEPALA KELUARGA </Button>
      <Button variant={props.activeLayer === 'KEPADATAN PENDUDUK'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("KEPADATAN PENDUDUK")}> KEPADATAN </Button>

      <DropdownButton as={ButtonGroup} title='JENIS KELAMIN' variant='outline-primary' size='sm'>
        <Dropdown.Item  eventKey="1" className="text-capitalize" onClick={() => handleChangeLayer("LAKI-LAKI")}> Laki-Laki </Dropdown.Item>
        <Dropdown.Item  eventKey="2" className="text-capitalize" onClick={() => handleChangeLayer("PEREMPUAN")}> Perempuan </Dropdown.Item>
      </DropdownButton>

      <DropdownButton as={ButtonGroup} title='ADMINISTRATIF' variant='outline-primary' size='sm'>
        <Dropdown.Item eventKey="1"  className="text-capitalize" onClick={() => handleChangeLayer("PERPINDAHAN PENDUDUK")}> Perpindahan Penduduk</Dropdown.Item>
        <Dropdown.Item eventKey="2"  className="text-capitalize" onClick={() => handleChangeLayer("PERUBAHAN DATA")}> Perubahan Data </Dropdown.Item>
        <Dropdown.Item eventKey="3"  className="text-capitalize" onClick={() => handleChangeLayer("WAJIB KTP")}> Wajib KTP </Dropdown.Item>
      </DropdownButton>


      <DropdownButton as={ButtonGroup} title='PERTUMBUHAN' variant='outline-primary' size='sm'>
        <Dropdown.Item eventKey="1"  className="text-capitalize" onClick={() => handleChangeLayer("PERTUMBUHAN PENDUDUK TAHUN 2018 (%)")}> Pertumbuhan Tahun 2018 </Dropdown.Item>
        <Dropdown.Item eventKey="2"  className="text-capitalize" onClick={() => handleChangeLayer("PERTUMBUHAN PENDUDUK TAHUN 2017 (%)")}> Pertumbuhan Tahun 2017 </Dropdown.Item>
        <Dropdown.Item eventKey="3"  className="text-capitalize" onClick={() => handleChangeLayer("PERTUMBUHAN PENDUDUK TAHUN 2016 (%)")}> Pertumbuhan Tahun 2016 </Dropdown.Item>
      </DropdownButton>

      <DropdownButton as={ButtonGroup} title='STATUS PERKAWINAN' variant='outline-primary' size='sm'>
        <Dropdown.Item eventKey="1"  className="text-capitalize" onClick={() => handleChangeLayer("BELUM KAWIN")}> Belum Kawin </Dropdown.Item>
        <Dropdown.Item eventKey="2"  className="text-capitalize" onClick={() => handleChangeLayer("KAWIN")}> Kawin </Dropdown.Item>
        <Dropdown.Item eventKey="3"  className="text-capitalize" onClick={() => handleChangeLayer("CERAI HIDUP")}> Cerai Hidup </Dropdown.Item>
        <Dropdown.Item eventKey="3"  className="text-capitalize" onClick={() => handleChangeLayer("CERAI MATI")}> Cerai Mati </Dropdown.Item>
      </DropdownButton>

      <DropdownButton as={ButtonGroup} title='AGAMA' variant='outline-primary' size='sm'>
        <Dropdown.Item  eventKey="1" className="text-capitalize" onClick={() => handleChangeLayer("ISLAM")}> Islam </Dropdown.Item>
        <Dropdown.Item  eventKey="2" className="text-capitalize" onClick={() => handleChangeLayer("KRISTEN")}> Kristen </Dropdown.Item>
        <Dropdown.Item  eventKey="3" className="text-capitalize" onClick={() => handleChangeLayer("KATHOLIK")}> Katholik </Dropdown.Item>
        <Dropdown.Item  eventKey="4" className="text-capitalize" onClick={() => handleChangeLayer("HINDU")}> Hindu </Dropdown.Item>
        <Dropdown.Item  eventKey="5" className="text-capitalize" onClick={() => handleChangeLayer("BUDHA")}> Budha </Dropdown.Item>
        <Dropdown.Item  eventKey="6" className="text-capitalize" onClick={() => handleChangeLayer("KONGHUCU")}> Konghucu </Dropdown.Item>
      </DropdownButton>
      <DropdownButton as={ButtonGroup} title='USIA' variant='outline-primary' size='sm'>
        <Dropdown.Item  eventKey="1" className="text-capitalize" onClick={() => handleChangeLayer("USIA 0-4 TAHUN")}> 0-4 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="2" className="text-capitalize" onClick={() => handleChangeLayer("USIA 5-9 TAHUN")}> 5-9 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="3" className="text-capitalize" onClick={() => handleChangeLayer("USIA 10-14 TAHUN")}> 10-14 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="4" className="text-capitalize" onClick={() => handleChangeLayer("USIA 15-19 TAHUN")}> 15-19 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="5" className="text-capitalize" onClick={() => handleChangeLayer("USIA 20-24 TAHUN")}> 20-24 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="6" className="text-capitalize" onClick={() => handleChangeLayer("USIA 25-29 TAHUN")}> 25-29 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="7" className="text-capitalize" onClick={() => handleChangeLayer("USIA 30-34 TAHUN")}> 30-34 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="8" className="text-capitalize" onClick={() => handleChangeLayer("USIA 35-39 TAHUN")}> 35-39 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="9" className="text-capitalize" onClick={() => handleChangeLayer("USIA 40-44 TAHUN")}> 40-44 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="10" className="text-capitalize" onClick={() => handleChangeLayer("USIA 45-49 TAHUN")}> 45-49 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="11" className="text-capitalize" onClick={() => handleChangeLayer("USIA 50-54 TAHUN")}> 50-54 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="12" className="text-capitalize" onClick={() => handleChangeLayer("USIA 55-59 TAHUN")}> 55-59 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="13" className="text-capitalize" onClick={() => handleChangeLayer("USIA 60-64 TAHUN")}> 60-64 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="14" className="text-capitalize" onClick={() => handleChangeLayer("USIA 65-69 TAHUN")}> 65-69 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="15" className="text-capitalize" onClick={() => handleChangeLayer("USIA 70-74 TAHUN")}> 70-74 Tahun </Dropdown.Item>
        <Dropdown.Item  eventKey="16" className="text-capitalize" onClick={() => handleChangeLayer("USIA 75 TAHUN KE ATAS")}> 75 Tahun ke Atas </Dropdown.Item>
      </DropdownButton>

      <DropdownButton as={ButtonGroup} title='PROFESI' variant='outline-primary' size='sm'>
        <Dropdown.Item  eventKey="1" className="text-capitalize" onClick={() => handleChangeLayer("BELUM/TIDAK BEKERJA")}> Belum / Tidak Bekerja </Dropdown.Item>
        <Dropdown.Item  eventKey="2" className="text-capitalize" onClick={() => handleChangeLayer("PELAJAR DAN MAHASISWA")}> Pelajar / Mahasiswa </Dropdown.Item>
        <Dropdown.Item  eventKey="3" className="text-capitalize" onClick={() => handleChangeLayer("WIRASWASTA")}> Wiraswasta </Dropdown.Item>
        <Dropdown.Item  eventKey="4" className="text-capitalize" onClick={() => handleChangeLayer("APARATUR PEJABAT NEGARA")}> Aparatur Negara </Dropdown.Item>
        <Dropdown.Item  eventKey="5" className="text-capitalize" onClick={() => handleChangeLayer("PERTANIAN DAN PETERNAKAN")}> Pertanian dan Peternakan </Dropdown.Item>
        <Dropdown.Item  eventKey="6" className="text-capitalize" onClick={() => handleChangeLayer("PENSIUNAN")}> Pensiunan </Dropdown.Item>
        <Dropdown.Item  eventKey="7" className="text-capitalize" onClick={() => handleChangeLayer("PEKERJAAN LAINNYA")}> Pekerjaan Lainnya </Dropdown.Item>
      </DropdownButton>

    </ButtonGroup>

    const onPendidikan = 
    <ButtonGroup aria-label='Pendidikan'>
      <Button variant={props.activeLayer === 'TAMAT SD'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("TAMAT SD")}> SD </Button>
      <Button variant={props.activeLayer === 'SLTP'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("SLTP")}> SMP </Button>
      <Button variant={props.activeLayer === 'SLTA'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("SLTA")}> SMA </Button>

      <DropdownButton as={ButtonGroup} title='DIPLOMA' variant='outline-primary' size='sm'>
        <Dropdown.Item  eventKey="1" className="text-capitalize" onClick={() => handleChangeLayer("D1 DAN D2")}> D1 dan D2 </Dropdown.Item>
        <Dropdown.Item  eventKey="2" className="text-capitalize" onClick={() => handleChangeLayer("D3")}> D3 </Dropdown.Item>
      </DropdownButton>

      <DropdownButton as={ButtonGroup} title='SARJANA' variant='outline-primary' size='sm'>
        <Dropdown.Item  eventKey="1" className="text-capitalize" onClick={() => handleChangeLayer("S1")}> S1 </Dropdown.Item>
        <Dropdown.Item  eventKey="2" className="text-capitalize" onClick={() => handleChangeLayer("S2")}> S2 </Dropdown.Item>
        <Dropdown.Item  eventKey="3" className="text-capitalize" onClick={() => handleChangeLayer("S3")}> S3 </Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>  

    const onKesehatan = 
    <ButtonGroup aria-label='Kesehatan'>
      <Button variant={props.activeLayer === 'TENAGA KESEHATAN'?'primary':'outline-primary'} size='sm' className='px-2 py-1' onClick={() => handleChangeLayer("TENAGA KESEHATAN")}> TENAGA KESEHATAN </Button>
      <DropdownButton as={ButtonGroup} title='GOLONGAN DARAH' variant='outline-primary' size='sm'>
        <Dropdown.Item  eventKey="1" className="text-capitalize" onClick={() => handleChangeLayer("GOLONGAN DARAH A")}> Golongan Darah A </Dropdown.Item>
        <Dropdown.Item  eventKey="2" className="text-capitalize" onClick={() => handleChangeLayer("GOLONGAN DARAH B")}> Golongan Darah B </Dropdown.Item>
        <Dropdown.Item  eventKey="3" className="text-capitalize" onClick={() => handleChangeLayer("GOLONGAN DARAH AB")}> Golongan Darah AB </Dropdown.Item>
        <Dropdown.Item  eventKey="4" className="text-capitalize" onClick={() => handleChangeLayer("GOLONGAN DARAH O")}> Golongan Darah O </Dropdown.Item>
        <Dropdown.Item  eventKey="5" className="text-capitalize" onClick={() => handleChangeLayer("GOLONGAN DARAH TIDAK DIKETAHUI")}> Golongan Darah Tidak Diketahui </Dropdown.Item>
      </DropdownButton>

    </ButtonGroup>
    
  return (
    <div className='toggle-handler fw-medium text-uppercase flex-wrap'>
      {toogleHandler()}
    </div>

  );
};

export default ToggleProperti;

import React from 'react';
import { Card } from '@mui/material';
import AwardsModal from 'src/components/AwardsModal/AwardsModal';
import useAwardsData from 'src/hooks/useAwardsData';
import { motion } from "framer-motion";
import AwardsTable from '../../views/awards/AwardsTable';

const Awards = () => {
  const { awardsData, editAwardId, open, setOpen, scroll, handleClickOpen, handleClose, handleEdit, deleteAwards, addAwards, editAwards } = useAwardsData();

  return (
    <>
      <AwardsModal editAwardId={editAwardId} awardsData={awardsData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addAwards={addAwards} editAwards={editAwards} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <AwardsTable
            awardsData={awardsData}
            deleteAwards={deleteAwards}
            handleEdit={handleEdit}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default Awards;
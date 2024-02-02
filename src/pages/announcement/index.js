import React from 'react';
import { Card } from '@mui/material';
import useAnnouncementData from 'src/hooks/useAnnouncementData';
import AnnouncementModal from 'src/components/AnnouncementModal/AnnouncementModal';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import AnnouncementTable from '../../views/announcement/AnnouncementTable';

const Announcement = () => {
  const router = useRouter();
  const { announcementData, editAnnoId, open, setOpen, scroll, handleClickOpen, handleClose, handleEdit, deleteAnnouncement, addAnnouncement, editAnnouncement } = useAnnouncementData();

  return (
    <>
      {router.pathname === "/" ? "" :
        <AnnouncementModal editAnnoId={editAnnoId} announcementData={announcementData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addAnnouncement={addAnnouncement} editAnnouncement={editAnnouncement} />
      }

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <AnnouncementTable
            announcementData={announcementData}
            router={router}
            deleteAnnouncement={deleteAnnouncement}
            handleEdit={handleEdit}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default Announcement;
import Typography from '@mui/material/Typography'
import React from 'react'
import styles from './page-title.module.scss'

const PageTitle: React.FC<PageTitleProps> = ({ title }) =>
  (
    <Typography
      variant="h3"
      component="h3"
      className={styles.page_title_container}
    >
      <strong>{title}</strong>
    </Typography>
  )

export type PageTitleProps = {
  title: string
}

export default PageTitle
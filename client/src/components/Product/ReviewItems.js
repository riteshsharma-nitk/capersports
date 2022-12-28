import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Grid, Rating} from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ReviewItems({review}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid>
    <Card  sx={{width:345 ,":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'} }}>
    <CardHeader
            avatar={
              <Avatar src={review?.userAvatarUrl} sx={{ bgcolor: red[500] }} aria-label="recipe">
              </Avatar>
            }

            title={review.name}
            subheader={String(review.reviewCreatedAt).substr(0, 10)}
        />
        <CardContent>
          {expanded?<></>:
          <Typography variant="body2" color="text.secondary">
            {(review.comment).substr(0, 40)} ...
          </Typography>}
            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>


            </Collapse>


        </CardContent>
        <CardActions disableSpacing>

            <Rating readOnly value={review.rating}></Rating>


          <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
          >

              <Tooltip title="Expand to read more">
            <ExpandMoreIcon />
              </Tooltip>
          </ExpandMore>



        </CardActions>
      </Card>
      </Grid>
  );
}
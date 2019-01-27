import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes, product } = props;
  console.log(classes);
  console.log(product);
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {product.brand}
        </Typography>
        <Typography variant="h5" component="h2">
          {product.productName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {product.productId}
        </Typography>
        <Typography component="p">
          Price: {product.price}
          <br />
          Quantity: {product.quantity}
        </Typography>
      </CardContent>

    </Card>
  );
}

SimpleCard.propTypes = {
//   classes: PropTypes.object.isRequired,
  product:JSON
};

export default withStyles(styles)(SimpleCard);

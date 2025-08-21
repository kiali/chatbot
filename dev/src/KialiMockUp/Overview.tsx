import * as React from 'react';
import { Card, CardBody, CardTitle, Gallery } from "@patternfly/react-core"
import { data } from './DataCard';


export const Overview: React.FC = (props) => {

    return (
        <Gallery hasGutter>
              {data.map((product, key) => (
                <Card isCompact isClickable isSelectable key={product.name} id={product.name.replace(/ /g, '-')}>
                    <CardTitle>{product.name}</CardTitle>
                    <CardBody>
                        <p>{product.description}</p>
                    </CardBody>
                </Card>
              ))}
              </Gallery>
    )
}
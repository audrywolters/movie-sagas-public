# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).


    // i'm not certain about this
    // if there were 10,000 movies, this loop would take a long time
    // the alternative is to hit the server on every click - that's a lot of traffic

    // i also question looping through redux each time i go to a new page
    // router could only send the movieID - Nav wasn't an option so I couldn't use <Components movie={this.props.movie} />
    // i could make a class or something for the loops but 
    // what if there were 100,000 movies? it would take a long time
/*********************************************************************
** Program Filename: Ant.hpp
** Author: Jason Lim
** Date: April 15th, 2018
** Description: This is the header file for Langston's Ant class
*********************************************************************/

#ifndef ANT_HPP
#define ANT_HPP

#include "Board.hpp"
#include <iostream>

enum Orientation {North, West, East, South};

class Ant {

private:
    int step, rowAnt, colAnt;
    Orientation antsOrientation = North;
    Board *boardFunction;

public:

    ~Ant(); //destructor to delete Ant
    void setRow(int row); //row position of ant
    void setCol(int col); //column position of ant
    void gameBoard(); //to create a board and initialize it
    void antStart(); //starting position of ant on board
    void moveAnt(); //using algorithm to move the ant


};


#endif

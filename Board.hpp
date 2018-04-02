/*********************************************************************
** Program Filename: Board.hpp
** Author: Jason Lim
** Date: April 15th, 2018
** Description: This is the header file for Langston's Ant Board class
*********************************************************************/

#ifndef BOARD_HPP
#define BOARD_HPP


class Board {

private:
    int boardRow;
    int boardColumn;
    char **boardTrackAnt;

public:
    ~Board(); //destructor for Board class
    int getRow(); //gets row
    int getColumn(); //gets column
    char getBoard(int row, int column); //gets current board
    void setBoard(int row, int col, char placeholder); //sets placeholder on board for white or black space
    void boardLimits(); //creates the board limits
    void createBoard(); //creates the board
    void printBoard(); //prints board

};


#endif

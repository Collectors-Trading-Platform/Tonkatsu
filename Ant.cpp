/*********************************************************************
** Program Filename: Ant.hpp
        ** Author: Jason Lim
** Date: April 15th, 2018
** Description: This is the implementation file for Langston's Ant class
*********************************************************************/

#include "Ant.hpp"

~Ant::Ant(); //destructor to delete Ant
void Ant::setRow(int row); //row position of ant
void Ant::setCol(int col); //column position of ant
void Ant::gameBoard(); //to create a board and initialize it
void Ant::antStart(); //starting position of ant on board
void Ant::moveAnt(); //using algorithm to move the ant

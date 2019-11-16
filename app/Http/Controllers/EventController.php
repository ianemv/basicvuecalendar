<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CalendarEvent;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CalendarEventCollection;
use App\Http\Resources\CalendarEventResource;

class EventController extends Controller
{
    //
    public function index(Request $request){
        try {
            $limit = empty($request->input('limit')) ? 100 : $request->input('limit') ;
            return new CalendarEventCollection(CalendarEvent::paginate($limit));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store (Request $request){

        try {
            if (count($request['events']) > 0 ){

                $json_array = $request->input('events');

                CalendarEvent::whereBetween('event_date', [$request->input('from_date'), $request->input('end_date')])
                                ->delete();

                $json_array=array_map(function ($a) {
                    return array_merge($a,
                                    ['created_at'=> date('Y-m-d H:i:s'),
                                    'updated_at'=> date('Y-m-d H:i:s')]
                                   );
                             }, $request['events']);


                CalendarEvent::insert(
                    $json_array
                );

                return response()->json(new CalendarEventResource($json_array), 201);

           }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }


    }

    public function update (Request $request){

    }


}

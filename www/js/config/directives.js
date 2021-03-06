/*
 * This file is part of [SpringAtom] Copyright [kornicameister@gmail.com][2014]
 *
 * [SpringAtom] is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * [SpringAtom] is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with [SpringAtom].  If not, see <http://www.gnu.org/licenses/gpl.html>.
 */

/**
 * Created by trebskit on 2014-08-11.
 */
define(
    [
        'config/app',
        // directives
        'directives/currentTime',
        'directives/scrollEffects'
        // directives
    ],
    function configDirectives(app) {
        var ready = false,
            offset = 1,
            directives = (function getDirectives(arg) {
                var local = [],
                    it = offset;
                for (it; it < arg.length; it++) {
                    local.push(arg[it]);
                }
                return local;
            }(arguments)),
            _register = function localRegister(directive) {
                if (directive instanceof Array && directive.length > 0) {
                    var i;
                    for (i = 0; i < directive.length; i++) {
                        _register(directive[i]);
                    }
                } else if (directive.name && directive.definition) {
                    console.log('directives :: registering directive for name=' + directive.name);
                    app.directive(directive.name, directive.definition);
                }
            },
            _configure = function localConfigure() {
                if (ready) {
                    return;
                }
                _register(directives);
                ready = true;
            };
        return {
            configure: _configure
        };
    }
);
